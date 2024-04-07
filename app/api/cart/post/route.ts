import {apiHeaders} from "@/app/api/utils";

export async function POST(request: Request) {

	try {
		const body = await request.json();
		const cartHash = body?.cartHash;
		let url = `${process.env.API_BASE_URL}/api/carts`;

		if (!cartHash) {
			return new Response(JSON.stringify({ error: "Cart hash is required" }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}


		const res = await fetch(`${url}`, {
			method: 'POST',
			headers: {
				...apiHeaders,
			},
			body: JSON.stringify(body)
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