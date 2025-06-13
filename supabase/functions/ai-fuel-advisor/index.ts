
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInput, calculations, budget, vehicles } = await req.json();

    console.log('AI Advisor request:', { userInput, calculationsCount: calculations?.length, budget, vehiclesCount: vehicles?.length });

    if (!openRouterApiKey) {
      throw new Error('OPENROUTER_API_KEY not configured');
    }

    // Prepare context data for AI
    const context = {
      recentCalculations: calculations?.slice(0, 5) || [],
      monthlyBudget: budget,
      vehicleCount: vehicles?.length || 0,
      totalSpending: calculations?.reduce((sum: number, calc: any) => sum + calc.total_cost, 0) || 0
    };

    const systemPrompt = `Anda adalah asisten cerdas untuk aplikasi anggaran bahan bakar. Berikan saran yang praktis dan relevan dalam bahasa Indonesia.

Konteks pengguna:
- Jumlah kendaraan: ${context.vehicleCount}
- Total pengeluaran BBM: Rp ${context.totalSpending.toLocaleString('id-ID')}
- Budget bulanan: ${context.monthlyBudget ? `Rp ${context.monthlyBudget.budget_amount.toLocaleString('id-ID')}` : 'Belum diatur'}
- Perhitungan terbaru: ${context.recentCalculations.length} data

Berikan saran yang:
1. Spesifik dan dapat ditindaklanjuti
2. Mempertimbangkan situasi keuangan pengguna
3. Fokus pada penghematan BBM dan efisiensi
4. Maksimal 3-4 poin saran
5. Gunakan format yang mudah dibaca

Jangan memberikan saran umum, berikan saran yang personal berdasarkan data pengguna.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://your-app-domain.com',
        'X-Title': 'Fuel Budget Advisor'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput || 'Berikan saran untuk mengoptimalkan anggaran BBM saya' }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ 
      advice: aiResponse,
      status: 'success'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-fuel-advisor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      status: 'error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
