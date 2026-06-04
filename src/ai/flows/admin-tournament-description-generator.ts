'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate engaging tournament descriptions for admins.
 *
 * - adminTournamentDescriptionGenerator - A function that handles the generation of tournament descriptions.
 * - AdminTournamentDescriptionGeneratorInput - The input type for the adminTournamentDescriptionGenerator function.
 * - AdminTournamentDescriptionGeneratorOutput - The return type for the adminTournamentDescriptionGenerator function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminTournamentDescriptionGeneratorInputSchema = z.object({
  gameName: z.string().describe('The name of the game for the tournament (e.g., Free Fire).'),
  gameMode: z.string().describe('The game mode of the tournament (e.g., Solo BR, CS Rank 4v4, Lone Wolf 1v1).'),
  entryFee: z.number().describe('The entry fee for the tournament. Use 0 for free entry.'),
  prizeStructure: z.string().describe('A detailed description of the prize structure (e.g., "1st Prize: 100 TK", "1st Prize: 50 TK, Per Kill: 5 TK").'),
  additionalDetails: z.string().optional().describe('Any additional details or special rules for the tournament.'),
});
export type AdminTournamentDescriptionGeneratorInput = z.infer<typeof AdminTournamentDescriptionGeneratorInputSchema>;

const AdminTournamentDescriptionGeneratorOutputSchema = z.object({
  description: z.string().describe('An engaging and informative description for the tournament.'),
});
export type AdminTournamentDescriptionGeneratorOutput = z.infer<typeof AdminTournamentDescriptionGeneratorOutputSchema>;

export async function adminTournamentDescriptionGenerator(input: AdminTournamentDescriptionGeneratorInput): Promise<AdminTournamentDescriptionGeneratorOutput> {
  return adminTournamentDescriptionGeneratorFlow(input);
}

const tournamentDescriptionPrompt = ai.definePrompt({
  name: 'tournamentDescriptionPrompt',
  input: { schema: AdminTournamentDescriptionGeneratorInputSchema },
  output: { schema: AdminTournamentDescriptionGeneratorOutputSchema },
  prompt: `You are an expert esports event promoter. Your task is to create an engaging and informative description for a new tournament.

Use the following details to craft a compelling tournament description:

Game: {{{gameName}}}
Game Mode: {{{gameMode}}}
Entry Fee: {{{entryFee}}}{{#if entryFee}} TK{{/if}}{{#unless entryFee}} (FREE ENTRY!){{/unless}}
Prize Structure: {{{prizeStructure}}}
{{#if additionalDetails}}Additional Details: {{{additionalDetails}}}{{/if}}

Focus on highlighting the excitement, competition, and rewards. Make it sound appealing to potential players.`,
});

const adminTournamentDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'adminTournamentDescriptionGeneratorFlow',
    inputSchema: AdminTournamentDescriptionGeneratorInputSchema,
    outputSchema: AdminTournamentDescriptionGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await tournamentDescriptionPrompt(input);
    return output!;
  }
);
