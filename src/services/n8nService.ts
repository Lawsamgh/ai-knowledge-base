import axios from 'axios';
import { supabase } from '../lib/supabase';

// Define the base URL for n8n API based on environment
// Use different base URLs for different environments
const getBaseUrl = () => {
  // For development on same machine, use localhost
  //const localhost = 'http://localhost:5678';
  const localhost = 'https://promasidor.app.n8n.cloud';
  
  // IP address of your computer where n8n is running - UPDATE THIS with your actual IP
  const localNetworkIp = 'http://192.168.100.75:5678'; // Updated to match actual IP
  
  // Try to determine if we're on a mobile device or different machine
  const isMobileOrDifferentDevice = 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768;
  
  // Get the current hostname
  const hostname = window.location.hostname;
  
  // If we're already using an IP or domain name, use the same host but with n8n port
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return `http://${hostname}:5678`;
  }
  
  // If we're on mobile or a different device, use the IP address
  if (isMobileOrDifferentDevice) {
    return localNetworkIp;
  }
  
  // Default to localhost
  return localhost;
};

const N8N_BASE_URL = getBaseUrl();

// Define the webhook endpoint
const WEBHOOK_ENDPOINT = '/webhook/6c734b78-3882-42eb-b583-fe0b589333ce';
//const WEBHOOK_ENDPOINT = '/webhook-test/6c734b78-3882-42eb-b583-fe0b589333ce';




/**
 * Gets the session ID from the Supabase user if logged in (async)
 * @returns Promise<string> The session ID (Supabase user id) or empty string if not logged in
 */
export const getSessionId = async (): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user && user.id) {
    return user.id;
  }
  return '';
};

// Response interface
export interface N8nResponse {
  response?: string;
  message?: string;
  data?: any;
  success: boolean;
  error?: string;
  session_id?: string;
}

/**
 * Pre-processes an API response to improve formatting
 * @param content The raw response content from n8n
 * @returns Formatted content with proper markdown
 */
const preprocessResponse = (content: string): string => {
  if (!content) return '';
  
  let processed = content;
  
  // Fix common formatting issues
  
  // Add proper line breaks between paragraphs
  processed = processed.replace(/([^\n])\n([^\n])/g, '$1\n\n$2');
  
  // Convert plain text numbered lists to markdown format
  processed = processed.replace(/^(\d+)[\.\)]\s+(.+)$/gm, '$1. $2');
  
  // Convert plain text bullet points to markdown format
  processed = processed.replace(/^[\*\-\•]\s+(.+)$/gm, '* $1');
  
  // Format sections with headers
  processed = processed.replace(/^([A-Z][A-Za-z\s]+):\s*$/gm, '### $1');
  
  // Handle code blocks - look for indented blocks of text that might be code
  const lines = processed.split('\n');
  let inCodeBlock = false;
  
  let codeLines: string[] = [];
  let formattedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
  
    
    // Check for markdown code blocks
    if (line.trim().startsWith('```')) {
      formattedLines.push(line);
      continue;
    }
    
    // Check for indented code blocks (4+ spaces or tab)
    const isIndented = line.startsWith('    ') || line.startsWith('\t');
    
    if (isIndented && !inCodeBlock) {
      // Start of indented code block
      inCodeBlock = true;
    
      codeLines = [];
      codeLines.push(line);
    } else if (isIndented && inCodeBlock) {
      // Continue code block
      codeLines.push(line);
    } else if (!isIndented && inCodeBlock) {
      // End of code block
      inCodeBlock = false;
      // If not just empty lines, format as code block
      if (codeLines.some(l => l.trim().length > 0)) {
        formattedLines.push('```');
        formattedLines = formattedLines.concat(codeLines.map(l => l.substring(4)));
        formattedLines.push('```');
        formattedLines.push(''); // Add empty line after code block
      } else {
        formattedLines = formattedLines.concat(codeLines);
      }
      formattedLines.push(line);
    } else {
      formattedLines.push(line);
    }
  }
  
  // Handle the case where the code block is at the end of the content
  if (inCodeBlock && codeLines.some(l => l.trim().length > 0)) {
    formattedLines.push('```');
    formattedLines = formattedLines.concat(codeLines.map(l => l.substring(4)));
    formattedLines.push('```');
  }
  
  processed = formattedLines.join('\n');
  
  // Properly format tables if they contain pipe characters
  if (processed.includes('|') && /\|.*\|/.test(processed)) {
    const tableLines = processed.split('\n');
    let tableFound = false;
    let tableLinesArr: string[] = [];
    let resultLines: string[] = [];
    
    for (let i = 0; i < tableLines.length; i++) {
      const line = tableLines[i];
      // Skip code blocks
      if (line.trim() === '```') {
        resultLines.push(line);
        let j = i + 1;
        while (j < tableLines.length && tableLines[j].trim() !== '```') {
          resultLines.push(tableLines[j]);
          j++;
        }
        if (j < tableLines.length) {
          resultLines.push(tableLines[j]); // Add closing ```
        }
        i = j;
        continue;
      }
      
      if (line.includes('|') && line.split('|').length > 2) {
        if (!tableFound) {
          tableFound = true;
          // Start collecting table lines
          tableLinesArr.push(line);
          
          // Add header separator row if this looks like a header
          if (i + 1 < tableLines.length && !tableLines[i + 1].includes('---')) {
            const columns = line.split('|').length - 1;
            let separator = '|';
            for (let j = 0; j < columns; j++) {
              separator += ' --- |';
            }
            tableLinesArr.push(separator);
          }
        } else {
          tableLinesArr.push(line);
        }
      } else {
        if (tableFound) {
          // End of table found, add an extra line break
          resultLines = resultLines.concat(tableLinesArr);
          resultLines.push('');
          tableLinesArr = [];
          tableFound = false;
        }
        resultLines.push(line);
      }
    }
    
    if (tableFound) {
      resultLines = resultLines.concat(tableLinesArr);
    }
    
    processed = resultLines.join('\n');
  }
  
  // Ensure links are formatted correctly
  processed = processed.replace(
    /(?<!["\(\[])(https?:\/\/[^\s]+)(?!["\)\]])/g, 
    '[$1]($1)'
  );
  
  // Format special keywords
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '**$1**');
  processed = processed.replace(/IMPORTANT:/gi, '**IMPORTANT:**');
  processed = processed.replace(/NOTE:/gi, '**NOTE:**');
  processed = processed.replace(/WARNING:/gi, '**WARNING:**');
  processed = processed.replace(/TIP:/gi, '**TIP:**');
  
  return processed;
};

/**
 * Sends a message to the n8n webhook and returns the response
 * @param message - The message to send to n8n
 * @returns Promise with the n8n response
 */
export const sendMessageToN8n = async (message: string): Promise<N8nResponse> => {
  const session_id = await getSessionId();
  
  // Calculate dynamic timeout based on message length
  // Longer messages might need more processing time in n8n
  const baseTimeout = 60000; // 30 seconds base
  const additionalTimePerChar = 10; // Add 10ms per character
  
  // Check if we're on a mobile device for longer timeouts
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768;
  
  // Add more time for mobile devices
  const mobileTimeoutFactor = isMobile ? 1.5 : 1;
  
  const calculatedTimeout = Math.min(
    (baseTimeout * mobileTimeoutFactor) + (message.length * additionalTimePerChar),
    180000 // Cap at 3 minutes max
  );
  console.log(`Setting timeout to ${calculatedTimeout}ms based on message length of ${message.length} chars (Mobile: ${isMobile})`);
  
  try {
    console.log('Sending to n8n:', { message, session_id });
    console.log('Webhook URL:', `${N8N_BASE_URL}${WEBHOOK_ENDPOINT}`);
    console.log('User Agent:', navigator.userAgent);
    console.log('Window width:', window.innerWidth);
    
    const response = await axios.post(`${N8N_BASE_URL}${WEBHOOK_ENDPOINT}`, {
      message,
      session_id
    }, {
      // Dynamic timeout based on message complexity
      timeout: calculatedTimeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Log the raw response for debugging
    console.log('Raw n8n response:', response.data);
    
    // Process the response data
    let responseData = response.data;
    
    // Handle different response formats
    let responseMessage: string | undefined;
    let responseContent: string | undefined;
    
    if (typeof responseData === 'string') {
      // Handle plain string response
      responseContent = responseData;
    } else if (responseData) {
      // Try to extract the response from different possible structures
      responseContent = responseData.response || responseData.message;
      
      // Check for n8n template expression that wasn't evaluated
      if (responseContent && (
          responseContent.includes('{{ $json') || 
          responseContent.match(/\{\{\s*\$json/)
      )) {
        console.log('Detected unevaluated n8n template expression');
        // If it's an unevaluated template, provide a fallback message
        responseContent = "I've received your message. However, there seems to be an issue with the n8n workflow template evaluation. Please check your n8n workflow configuration.";
      }
      
      // Check for nested data structure
      if (!responseContent && responseData.data) {
        if (typeof responseData.data === 'string') {
          responseContent = responseData.data;
        } else {
          responseContent = responseData.data.response || responseData.data.message;
          
          // Also check for unevaluated template in nested data
          if (responseContent && (
              responseContent.includes('{{ $json') || 
              responseContent.match(/\{\{\s*\$json/)
          )) {
            console.log('Detected unevaluated n8n template expression in nested data');
            responseContent = "I've received your message. However, there seems to be an issue with the n8n workflow template evaluation. Please check your n8n workflow configuration.";
          }
        }
      }
    }
    
    // Preprocess response for better formatting
    if (responseContent) {
      responseContent = preprocessResponse(responseContent);
    }
    
    return {
      success: true,
      response: responseContent,
      message: responseMessage,
      data: responseData,
      session_id
    };
  } catch (error: any) {
    console.error('Error sending message to n8n:', error);
    console.log('Error details:', error.response?.data || error.message);
    console.log('Error timestamp:', new Date().toISOString());
    console.log('Request URL:', `${N8N_BASE_URL}${WEBHOOK_ENDPOINT}`);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to connect to the knowledge base';
    
    if (error.message.includes('Network Error')) {
      errorMessage = 'Network Error: Could not reach the n8n server. Make sure you are connected to the same network as the n8n server and the server is running.';
    } else if (error.message.includes('timeout')) {
      errorMessage = `Connection timeout: The server is taking too long to respond. Your request might still be processing in n8n, but the app connection timed out after ${Math.round(calculatedTimeout/1000)} seconds. For complex queries, try breaking them into smaller parts.`;
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = `Server error (${error.response.status}): ${error.response.data || error.message}`;
    }
    
    return {
      success: false,
      error: errorMessage,
      session_id
    };
  }
};

/**
 * Tests the connection to the n8n server
 * @returns Promise with connection test results
 */
export const testConnection = async (): Promise<{
  success: boolean;
  message: string;
  pingTime?: number;
  url: string;
}> => {
  const startTime = Date.now();
  const url = `${N8N_BASE_URL}/healthz`;
  
  try {
    console.log(`Testing connection to n8n at ${url}`);
    
    // Using a short timeout for health check
  await axios.get(url, {
      timeout: 5000,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const pingTime = Date.now() - startTime;
    console.log(`Connection successful! Response time: ${pingTime}ms`);
    
    return {
      success: true,
      message: `Successfully connected to n8n. Response time: ${pingTime}ms`,
      pingTime,
      url
    };
  } catch (error: any) {
    console.error('Connection test failed:', error);
    
    let errorMessage = 'Failed to connect to n8n server';
    
    if (error.message.includes('Network Error')) {
      errorMessage = 'Network Error: Could not reach the n8n server. Check if it is running and accessible.';
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Connection timeout: The server took too long to respond to a simple health check.';
    } else if (error.response) {
      errorMessage = `Server error (${error.response.status}): ${error.response.data || error.message}`;
    }
    
    return {
      success: false,
      message: errorMessage,
      url
    };
  }
};

/**
 * Configuration object for n8n service
 */
export const n8nConfig = {
  get baseUrl() {
    return N8N_BASE_URL;
  },
  
  get webhookEndpoint() {
    return WEBHOOK_ENDPOINT;
  },
  
  get fullWebhookUrl() {
    return `${N8N_BASE_URL}${WEBHOOK_ENDPOINT}`;
  }
};

export default {
  sendMessageToN8n,
  getSessionId,
  testConnection,
  n8nConfig
}; 