// supabase/functions/update-user/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') { return new Response('ok', { headers: corsHeaders }) }
  try {
    const { id, fullName, role, password } = await req.json()
    const supabaseAdmin = createClient( Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' )

    const updateData: any = {
      user_metadata: { fullName: fullName, role: role }
    };
    // Hanya update password jika diisi
    if (password) {
      updateData.password = password;
    }

    const { data: { user }, error } = await supabaseAdmin.auth.admin.updateUserById(id, updateData)

    if (error) throw error
    return new Response(JSON.stringify({ user }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})