import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import { SmtpClient } from 'npm:smtp@0.1.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, code, firstName } = await req.json();

    // Configure your SMTP settings
    const client = new SmtpClient({
      connection: {
        hostname: Deno.env.get('SMTP_HOST') || '',
        port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
        tls: true,
        auth: {
          username: Deno.env.get('SMTP_USER') || '',
          password: Deno.env.get('SMTP_PASS') || '',
        },
      },
    });

    const emailContent = `
      Hi ${firstName},

      Thank you for registering! Please use the following code to verify your email:

      ${code}

      This code will expire in 24 hours.

      Best regards,
      Your App Team
    `;

    await client.send({
      from: Deno.env.get('SMTP_FROM') || '',
      to: email,
      subject: 'Verify Your Email',
      content: emailContent,
    });

    await client.close();

    return new Response(
      JSON.stringify({ message: 'Verification email sent' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});