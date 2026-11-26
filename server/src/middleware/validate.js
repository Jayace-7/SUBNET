import { AppError } from '../utils/AppError.js';

// Reusable validation checkpoint.
// Usage in a route:  router.post('/x', validate({ body: bodySchema, query: querySchema }), controller)
//
// Everything a visitor sends (URL params, query string, JSON body) is UNTRUSTED.
// This middleware checks each part against a zod schema BEFORE any controller runs.
// - Valid data is stored in req.validated (cleaned, with the right types).
// - Invalid data is rejected with a 400 and a safe list of problems.
//
// Express 5 note: req.query is read-only, so we never assign to it.
// Controllers must read cleaned data from req.validated, not from req.body/req.query.
export function validate(schemas) {
  return (req, res, next) => {
    const validated = {};
    const problems = [];

    for (const part of ['params', 'query', 'body']) {
      if (!schemas[part]) continue;

      const result = schemas[part].safeParse(req[part]);

      if (result.success) {
        validated[part] = result.data;
      } else {
        for (const issue of result.error.issues) {
          if (issue.code === 'unrecognized_keys') {
            // zod reports ALL unexpected keys in ONE issue whose path is empty,
            // so joining the path would give a blank field name. We create one
            // problem per unexpected key instead, named by the key itself.
            // The message is fixed text, so submitted values are never echoed.
            for (const key of issue.keys) {
              problems.push({
                in: part,
                field: [...issue.path, key].join('.'),
                message: 'Unexpected field',
              });
            }
          } else {
            // Only the location, field name, and message are returned. We never echo
            // back the submitted values, and details are never written to the logs.
            problems.push({
              in: part,
              field: issue.path.join('.'),
              message: issue.message,
            });
          }
        }
      }
    }

    if (problems.length > 0) {
      return next(new AppError(400, 'Validation failed', problems));
    }

    req.validated = validated;
    next();
  };
}
