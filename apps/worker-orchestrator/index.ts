import {
  SetDesiredCapacityCommand,
  AutoScalingClient,
  DescribeAutoScalingInstancesCommand,
} from "@aws-sdk/client-auto-scaling";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

import express, { type Request, type Response } from "express";

const ec2Client = new EC2Client({
  region: "ap-south-1",
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
  },
});

const client = new AutoScalingClient({
  region: "ap-south-1",
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
  },
});

// async function main() {
// //   const asgCommand = new SetDesiredCapacityCommand({
// //     AutoScalingGroupName: "code-server-asg",
// //     DesiredCapacity: 2,
// //   });

// const getInstance = new DescribeAutoScalingInstancesCommand()

//   const res = await client.send(getInstance);
//   console.log("🚀 ~ main ~ res:", res)
// }
// main()

// store all machine
interface Machine {
  isIdeal: boolean;
  instanceId: string;
  projectId?: string;
  instanceIp: string;
}
const allMachine: Machine[] = [];

// get all machine after every 30 sec and update all machine if not exists

async function getAllInstance() {
  const instancesCommand = await new DescribeAutoScalingInstancesCommand();
  const allInstances = await client.send(instancesCommand);
  

  //   {
  //     InstanceId: "i-0fe5e9f372859a722",
  //     InstanceType: "t2.medium",
  //     AutoScalingGroupName: "code-server-asg",
  //     AvailabilityZone: "ap-south-1a",
  //     LifecycleState: "InService",
  //     HealthStatus: "HEALTHY",
  //     LaunchTemplate: {
  //       LaunchTemplateId: "lt-05b55a596a8498a86",
  //       LaunchTemplateName: "vs-code-temp",
  //       Version: "1",
  //     },
  //     ProtectedFromScaleIn: false,
  //   }

  const unRegisteredInstance: any =
    await allInstances.AutoScalingInstances?.filter((item) => {
      return !allMachine.some(
        (existing_instance) => existing_instance.instanceId === item.InstanceId
      );
    });
  console.log(
    "🚀 ~ getAllInstance ~ unRegisteredInstance:",
    unRegisteredInstance
  );

  if (unRegisteredInstance.length > 0) {
    const instanceIp = {
      InstanceIds: unRegisteredInstance.map(
        (instance: any) => instance.InstanceId
      ),
    };

    const getInstanceIpsCommand = await new DescribeInstancesCommand(
      instanceIp
    );
    const instanceIps: any = await ec2Client.send(getInstanceIpsCommand);

    const finalIp = await instanceIps.Reservations[0]?.Instances?.map(
      (instance: any) => {
        return {
          instanceIp: instance.NetworkInterfaces[0]?.Association?.PublicIp,
          instanceId: instance.InstanceId,
        };
      }
    );

    const finalMachineToBeAdded: Machine[] = await finalIp.map(
      (instance: any) => {
        return {
          isIdeal: true,
          instanceId: instance.instanceId,

          instanceIp: instance.instanceIp,
        };
      }
    );

    allMachine.push(...finalMachineToBeAdded);
  }
}

setInterval(getAllInstance, 10000);

const app = express();

async function scaleInstance(scaleUpTo: number) {
  let desiredCapacity;
  const idealMachines = allMachine.filter((machine) => machine.isIdeal);
  console.log("🚀 ~ scaleInstance ~ idealMachines:", idealMachines)

  if (idealMachines.length < 3) {
    const a = 3 - idealMachines.length;
    desiredCapacity = a + idealMachines.length;
    const desiredCommand = new SetDesiredCapacityCommand({
      AutoScalingGroupName: "code-server-asg",
      DesiredCapacity: desiredCapacity,
    });
    const res = await client.send(desiredCommand);
    console.log(`scallling for ${desiredCapacity} `);
    return;
  }

  console.log(`no need to scale ideal machines are ${idealMachines.length}`);
}

app.get("/get-machine/:projectId", async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const getIdealMachine = allMachine.find((machine) => machine.isIdeal == true);
  console.log("🚀 ~ app.get ~ getIdealMachine:", getIdealMachine);

  if (!getIdealMachine) {
    // scale up
    await scaleInstance(1);
    res.json("Please try again");
    return;
  }

  getIdealMachine.isIdeal = false;

  getIdealMachine.projectId = projectId;
  // scale up
  await scaleInstance(1);
  res.json(getIdealMachine.instanceIp);
});

app.get("/", (req, res) => {
  res.json(allMachine);
});

app.listen(8000, () => console.log("Running on 8000"));

// /get-machine
//- get ideal machine
//- if not scale up
// return false
// get ideal machine
// scale up
// return ip
