import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { types_names } from "./types";

/**
 * Generate all autocompletion items
 */
abstract class CompletionItemGenerator {
    private static id_counter = 0;

    public static keywords: [string] = [""]; // data attribute === index in this array

    public static createCompletionItem(name: string): CompletionItem {
        CompletionItemGenerator.id_counter++;

        this.keywords.push(name);

        return {
            label: name,
            kind: CompletionItemKind.Field,
            data: CompletionItemGenerator.id_counter,
        };
    }
}

interface KeywordData {
    name: string;
    documentation: string;
}

// DEUX CHOSES:
// LISTE DES KEYWORDS (index == data)
// MAP KEYWORD -> DATA

// On completion
// On completion resolve

/*
Remarque: il faut un type de données centralisé!
il associe au keyword toutes ses infos

il faut aussi pouvoir y accéder via data


*/

// Ajout des types
const onCompletionTypesArray = types_names.map((type) => {
    return CompletionItemGenerator.createCompletionItem(type);
});

// Remarque: les details apparaissent brièvement, la doc apparaît si on clique

export const onCompletionArray: CompletionItem[] = [...onCompletionTypesArray];

/**
 * Return more detailed info about the item to be autocompleted
 */
export function resolveCompletion(item: CompletionItem): CompletionItem {
    item.detail = CompletionItemGenerator.keywords[item.data];
    item.documentation = CompletionItemGenerator.keywords[item.data];

    return item;
}
