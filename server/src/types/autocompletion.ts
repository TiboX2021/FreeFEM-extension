import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { types_names } from "./types";

import types from "./new_types.json";

/** JSON data format for keywords */
interface KeywordFormat {
    name: string;
    tooltip: string;
    documentation: string;
    detail: string;
    kind: string;
}

// TODO: est-ce que cette interface est nécessaire? Oui, ça va définir l'output
interface KeywordData {
    name: string;
    documentation: string;
}

/**
 * A terme: toutes les fonctions pour exploiter les objets json seront là dedans
 *
 * données à stocker
 * il faut parser le tooltip, ? Pour l'instant, ne rien parser du tout
 *
 *
 */

/**
 * Generate all autocompletion items
 */
abstract class CompletionItemGenerator {
    private static id_counter = 0;

    public static keywords: [string] = [""]; // data attribute === index in this array

    public static data: [] = []; // TODO: store data inside (slightly format KeywordFormat)

    public static createCompletionItem(entry: KeywordFormat): CompletionItem {
        CompletionItemGenerator.id_counter++;

        this.keywords.push(entry.name);

        // TODO: parse properly, do not return anything?
        return {
            label: entry.name,
            // TODO: finir ça
        };
    }

    public static createCompletionItems(entries: KeywordFormat[]) {
        for (const entry of entries) {
            CompletionItemGenerator.createCompletionItem(entry);
        }
    }
}

// PARSE TYPES
CompletionItemGenerator.createCompletionItems(types);

// TODO : same for functions, etc

// Use the static class
export function getCompletionItems(): CompletionItem[] {
    return []; // TODO: return completion items for 'onCompletion'
}

export function resolveCompletion(item: CompletionItem): CompletionItem {
    const id = item.data;

    // Chopper les données dans data puis renvoyer ce qui va bien

    return item;
}
