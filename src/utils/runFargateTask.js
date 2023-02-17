const AWS = require('aws-sdk');
const fargate = new AWS.ECS({ region: 'us-east-1' });

/* This example runs the specified task definition on your default cluster. */
// https://docs.aws.amazon.com/cli/latest/reference/ecs/run-task.html

var overrides = {
    "containerOverrides": [
        {
            "name": "",
            "command": [],
            "environment": [
                {
                    "name": "ecsEnvName",
                    "value": "ecsEnvValue"
                }
            ],
        }
    ]
}

var params = {
    cluster: "",
    taskDefinition: "",
    launchType: 'FARGATE',
    count: 10,
    networkConfiguration: {
        awsvpcConfiguration: {
            subnets: ['subnet-0bb391c4ee31e039d'],
            assignPublicIp: 'ENABLED'
        }
    }
};
params.overrides = overrides;

const runFargateTask = async (cluster,taskDefinition,command,count = 10) => {
    tasksArns = []
    const BATCH_SIZE = 10;
    console.log(cluster,taskDefinition,command);
    params.cluster = cluster;
    params.taskDefinition = taskDefinition;
    params.overrides.containerOverrides[0].name = taskDefinition;
    params.overrides.containerOverrides[0].command = command;
    try {
        const batches = Math.floor(count / BATCH_SIZE);
        const remainder = count % BATCH_SIZE;
        console.log(`Batch of ${BATCH_SIZE}: ${batches}`);
        for (let index = 1; index <= batches; index++) {
            const provisionedTasks = await fargate.runTask(params).promise();
            // console.log(provisionedTasks.tasks);
            provisionedTasks.tasks.forEach(provisionedTask => {
                // console.log(provisionedTask.overrides);
                tasksArns.push(provisionedTask.taskArn);
            });
        }
        if (remainder > 0) {
            params.count = remainder;
            const provisionedTasks = await fargate.runTask(params).promise();
            // console.log(provisionedTasks.tasks);
            provisionedTasks.tasks.forEach(provisionedTask => {
                // console.log(provisionedTask.overrides);
                tasksArns.push(provisionedTask.taskArn);
            });
        }
        console.log(tasksArns, tasksArns.length);
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    runFargateTask
}