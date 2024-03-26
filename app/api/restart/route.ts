import { Octokit } from "@octokit/core"

const owner = process.env.OWNER
const repo = process.env.REPO
const workflow_id = process.env.WORKFLOW_ID

export async function POST(request: Request) {
    const octokit = new Octokit({
        auth: process.env.GH_TOKEN,
    })

    // Check if .env variables are correctly set

    if (!owner || !repo || !workflow_id) {
        return new Response("Missing .env variable")
    }

    // First get the latest workflow run

    const response = await octokit.request(
        "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
        {
            owner,
            repo,
            workflow_id,
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    )

    console.log("response", response)
    console.log("data", response.data)
    console.log("workflow_runs", response.data.workflow_runs[0])

    // Get run_id of latest run
    const latest_run = response.data.workflow_runs[0]
    const run_id = latest_run.id

    // Now, re-run the latest run
    await octokit.request(
        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun",
        {
            owner,
            repo,
            run_id,
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    )

    const payload = {
        run_id,
        message: "Workflow restart completed",
        repo,
        workflow_run_name: latest_run.name,
        status: latest_run.status,
        conclusion: latest_run.conclusion,
        workflow_id,
    }

    return new Response(JSON.stringify(payload))
}
