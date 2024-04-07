import {apiHeaders} from "@/app/api/utils";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const cartHash = searchParams.get('cartHash');

		if (!cartHash) {
			return new Response(JSON.stringify({ error: "Cart hash is required" }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		const res = await fetch(`${process.env.API_BASE_URL}/api/carts?where[cartHash][equals]=${cartHash}&populate=items.productId&populate=selectedDelivery&populate=selectedPayment`, {
			headers: {
				...apiHeaders,
			},
		  cache: 'no-store'
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch cart: ${res.statusText}`);
		}

		const cart = await res.json();
		return new Response(JSON.stringify(cart), {
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