import {apiHeaders} from "@/app/api/utils";

export async function GET(request: Request) {
	try {
		const res = await fetch(`${process.env.API_BASE_URL}/api/payments`, {
			headers: {
				...apiHeaders,
			},
			cache: 'no-store'
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch cart: ${res.statusText}`);
		}

		const response = await res.json();
		return new Response(JSON.stringify(response), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}