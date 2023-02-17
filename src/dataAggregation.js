const { runFargateTask } = require("./utils/runFargateTask");


const main = async () => {
    try {
        // data aggregation task here
        // run fargate tasks based on kinesis.
        await runFargateTask("reporting-cluster2","report-create-task", ["node", "createPdf.js", 'runTaskECS', "1"]);
    } catch (error) {
        console.log('dataAggregation')
    }
}

main();



