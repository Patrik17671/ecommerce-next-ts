import {apiHeaders} from "@/app/api/utils";

export async function DELETE(request: Request ,{ params }: { params: { cartHash: string } }) {

	try {
		const cartHash = params.cartHash;

		let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts?where[cartHash][equals]=${cartHash}`;

		if (!cartHash) {
			return new Response(JSON.stringify({ error: "Cart hash is required" }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		const res = await fetch(`${url}`, {
			method: 'DELETE',
			headers: {
				...apiHeaders,
			},
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