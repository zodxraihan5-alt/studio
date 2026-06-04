'use server';
/**
 * @fileOverview An AI agent to analyze historical tournament data and recommend optimal prize pool adjustments.
 *
 * - adminMatchPrizeOptimizer - A function that handles the prize pool optimization process.
 * - AdminMatchPrizeOptimizerInput - The input type for the adminMatchPrizeOptimizer function.
 * - AdminMatchPrizeOptimizerOutput - The return type for the adminMatchPrizeOptimizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminMatchPrizeOptimizerInputSchema = z.object({
  historicalTournaments: z.array(
    z.object({
      tournamentName: z.string().describe('Name of the tournament.'),
      date: z.string().describe("Date of the tournament (e.g., 'YYYY-MM-DD')."),
      entryFee: z.number().describe('Entry fee for the tournament.'),
      winningPrice: z.number().describe('Total prize money for the tournament.'),
      participants: z.number().describe('Number of participants in the tournament.'),
      playerEngagementScore: z
        .number()
        .describe('A score representing player engagement for this tournament (e.g., 1-10, higher is better).'),
      profitMargin: z
        .number()
        .describe('Profit margin for this tournament (e.g., 0.2 for 20% profit, can be negative for loss).'),
    })
  ).describe('Historical data for various tournaments.'),
});
export type AdminMatchPrizeOptimizerInput = z.infer<typeof AdminMatchPrizeOptimizerInputSchema>;

const AdminMatchPrizeOptimizerOutputSchema = z.object({
  overallAnalysis: z
    .string()
    .describe('Overall analysis of the historical data, identifying key trends in participation, engagement, and profitability.'),
  recommendations: z.array(
    z.object({
      tournamentName: z.string().describe('Name of the tournament for which a recommendation is made.'),
      recommendedEntryFee: z.number().describe('Recommended entry fee for this tournament.'),
      recommendedWinningPrice: z.number().describe('Recommended total winning price for this tournament.'),
      reasoning: z.string().describe('Detailed reasoning behind the recommended adjustments for this specific tournament.'),
    })
  ).describe('Specific recommendations for prize pool adjustments for future tournaments.'),
  generalSuggestions: z
    .string()
    .describe('General suggestions for improving player participation and game economics based on the analysis, separate from specific tournament adjustments.'),
});
export type AdminMatchPrizeOptimizerOutput = z.infer<typeof AdminMatchPrizeOptimizerOutputSchema>;

export async function adminMatchPrizeOptimizer(
  input: AdminMatchPrizeOptimizerInput
): Promise<AdminMatchPrizeOptimizerOutput> {
  return adminMatchPrizeOptimizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminMatchPrizeOptimizerPrompt',
  input: {schema: AdminMatchPrizeOptimizerInputSchema},
  output: {schema: AdminMatchPrizeOptimizerOutputSchema},
  prompt: `You are an expert game economist and data analyst for the 'ZR ESPORTS' platform.
Your task is to analyze historical tournament data to identify trends in player participation, engagement, and profitability, and then recommend optimal prize pool adjustments for future tournaments.
The primary goal is to maximize player participation while balancing the game's economics to ensure long-term sustainability and profitability.

Analyze the following historical tournament data:

{{#each historicalTournaments}}
Tournament Name: {{{tournamentName}}}
Date: {{{date}}}
Entry Fee: {{{entryFee}}}
Winning Price: {{{winningPrice}}}
Participants: {{{participants}}}
Player Engagement Score (1-10): {{{playerEngagementScore}}}
Profit Margin: {{{profitMargin}}}
---
{{/each}}

Based on this data, provide:
1. An overall analysis of the trends you observe.
2. Specific recommendations for adjusting the entry fees and winning prices for each tournament (or similar future tournaments) to achieve the stated goals.
3. General suggestions for improving player participation and game economics across the platform.

Ensure your output is a JSON object matching the AdminMatchPrizeOptimizerOutputSchema, with clear and actionable recommendations and thorough reasoning.`,
});

const adminMatchPrizeOptimizerFlow = ai.defineFlow(
  {
    name: 'adminMatchPrizeOptimizerFlow',
    inputSchema: AdminMatchPrizeOptimizerInputSchema,
    outputSchema: AdminMatchPrizeOptimizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
