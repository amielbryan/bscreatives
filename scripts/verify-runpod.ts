import "dotenv/config";
import axios from "axios";

const RUNPOD_ENDPOINT_ID = "wjgrceva5q6u0p";
const API_KEY = process.env.RUNPOD_API_KEY;

if (!API_KEY || API_KEY === "ENTER_YOUR_API_KEY_HERE") {
    console.error("❌ Error: Please set your RUNPOD_API_KEY in .env");
    process.exit(1);
}

async function testRunPod() {
    console.log("🚀 Testing RunPod Connection...");
    console.log(`Endpoint: ${RUNPOD_ENDPOINT_ID}`);

    try {
        // 1. Submit Job
        console.log("Submitting test job...");
        const submitResp = await axios.post(
            `https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/run`,
            {
                input: {
                    prompt: "A futuristic city with neon lights, 8k resolution",
                    style: "cyberpunk"
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const jobId = submitResp.data.id;
        console.log(`✅ Job Submitted! ID: ${jobId}`);

        // 2. Poll Status
        let status = "IN_PROGRESS";
        while (status === "IN_PROGRESS" || status === "IN_QUEUE") {
            process.stdout.write(".");
            await new Promise((r) => setTimeout(r, 2000));

            const statusResp = await axios.get(
                `https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/status/${jobId}`,
                {
                    headers: { Authorization: `Bearer ${API_KEY}` },
                }
            );

            status = statusResp.data.status;
        }

        console.log(`\nFinal Status: ${status}`);
        if (status === "COMPLETED") {
            console.log("🎉 Success! Output:", statusResp.data.output);
        } else {
            console.error("❌ Failed:", statusResp.data);
        }

    } catch (error: any) {
        console.error("\n❌ Request Failed:", error.response?.data || error.message);
    }
}

testRunPod();
