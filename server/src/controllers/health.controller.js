// Controller = the "waiter": it receives the request and sends the response.
// Real business logic will live in services (added in later stages).
export function getHealth(req, res) {
  // Standard success shape for the API: { status: 'success', data: ... }
  res.status(200).json({
    status: 'success',
    data: { service: 'subnet-server', apiVersion: 'v1' },
  });
}
