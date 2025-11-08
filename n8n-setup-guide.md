# N8N Workflow Setup Guide

## Issue: Template Expression Not Being Evaluated

You're experiencing an issue where n8n is returning the literal template string `{{ $json.output }}` instead of the actual content of the output variable. This is a common issue with n8n workflows.

## How to Fix It

### Option 1: Use a Function Node to Return the Response

1. In your n8n workflow, after processing the input, add a **Function** node.
2. In the Function node, use code like this:
   ```javascript
   // Get the output from the previous node
   const output = $input.all()[0].json.output;
   
   // Return a proper response object
   return {
     json: {
       response: output
     }
   };
   ```
3. Connect this Function node to your webhook response.

### Option 2: Fix the Respond to Webhook Node

If you're using the "Respond to Webhook" node:

1. Make sure you're selecting the proper data from the previous nodes.
2. Instead of using the template expression in the Response Body, set it directly to the output of the previous node.
3. In the "Response Body" field, click on the gear icon to open Expression Editor.
4. Use a more direct reference like `{{ $json["output"] }}` or select the output variable from the variables panel.

### Option 3: Use a Set Node Before Responding

1. Add a **Set** node before your webhook response.
2. In the Set node, create a variable named "response".
3. Set the value to the output from your previous processing.
4. In the webhook response, use this new variable which has already been evaluated.

## Important Configuration Tips

1. **Webhook Setup**:
   - Make sure your webhook is properly configured to receive requests from the Vue app.
   - The endpoint path should be `/webhook/6c734b78-3882-42eb-b583-fe0b589333ce`.
   - Enable "Response Mode" in the webhook configuration.

2. **Data Structure**:
   - The Vue app expects the response in this format: `{ "response": "Your response text here" }`
   - Alternatively, it can handle `{ "message": "Your response text here" }`

3. **Debugging**:
   - Use the "Debug" node in n8n to see what data is being processed.
   - Check the browser console in your Vue app to see what's being received.

## Testing the Webhook Directly

You can test your n8n webhook directly using curl:

```bash
curl -X POST http://localhost:5678/webhook/6c734b78-3882-42eb-b583-fe0b589333ce \
  -H "Content-Type: application/json" \
  -d '{"message": "test message", "session_id": "test-session-123"}'
```

This should return a properly formatted response if your workflow is configured correctly. 