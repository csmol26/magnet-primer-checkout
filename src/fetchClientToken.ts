/**
 * Client token retrieval.
 *
 * In production the merchant's backend calls Primer's
 * `POST /client-session` with the API key and returns the `clientToken` to the
 * browser. The API key never reaches the front end.
 *
 * This mockup has no backend, so it uses Primer's public SDK demo service,
 * which hands out short-lived SANDBOX client sessions. Swap `fetchClientToken`
 * for a call to your own endpoint and nothing else in the project changes.
 */

const DEMO_TOKEN_ENDPOINT = 'https://sdk-demo.primer.io/api/examples';
const DEMO_API_KEY = 'a1b2c3d4e5f6g7h8i9j0';

export interface ClientTokenSuccessResponse {
  success: true;
  clientToken: string;
  orderId?: string;
}

export interface ClientTokenErrorResponse {
  success: false;
  error: string;
}

export type ClientTokenResponse =
  | ClientTokenSuccessResponse
  | ClientTokenErrorResponse;

export async function fetchClientToken(
  example?: string,
): Promise<ClientTokenResponse> {
  try {
    const url = new URL(DEMO_TOKEN_ENDPOINT);
    if (example) {
      url.searchParams.append('example', example);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${DEMO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok || !data?.clientToken) {
      return {
        success: false,
        error: data?.error ?? 'Failed to fetch a client token',
      };
    }

    return {
      success: true,
      clientToken: data.clientToken,
      orderId: data.orderId,
    };
  } catch (error) {
    console.error('Error fetching client token:', error);

    return { success: false, error: 'Could not reach the client session API' };
  }
}
