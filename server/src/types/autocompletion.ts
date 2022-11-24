import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import types from "./types.json";

/** JSON data format for keywords */
interface KeywordFormat {
    name: string;
    tooltip: string;
    documentation: string;
    detail: string;
    kind: string;
}

/** Data storage format. TODO: change to accept markdown values (string[]) */
interface KeywordData {
    kind: CompletionItemKind;
    label: string;
    tooltip: string;
    documentation: string;
    detail: string;
    data: number;
}

/**
 * Generate all autocompletion items, and store data
 */
abstract class CompletionItemGenerator {
    private static id_counter = -1;

    public static keywords: string[] = []; // data attribute === index in this array
    public static keyword_data: Map<string, KeywordData> = new Map<
        string,
        KeywordData
    >();

    public static COMPLETION_KIND_MAP = new Map(
        Object.entries(CompletionItemKind)
    );

    public static getItemFromData(data: number): KeywordData | undefined {
        return this.keyword_data.get(this.keywords[data]);
    }

    public static registerKeyword(entry: KeywordFormat): void {
        CompletionItemGenerator.id_counter++; // Increment unique id counter

        this.keywords.push(entry.name); // Register keyword name

        // Parse the kind. Default value: Text
        const kind =
            CompletionItemGenerator.COMPLETION_KIND_MAP.get(entry.kind) ??
            CompletionItemKind.Text;

        const result = {
            label: entry.name,
            kind,
            detail: entry.detail,
            documentation: entry.documentation,
            tooltip: entry.tooltip,
            data: CompletionItemGenerator.id_counter,
        };

        this.keyword_data.set(entry.name, result); // Set map entry for this keyword
    }

    public static registerKeywords(entries: KeywordFormat[]): void {
        for (const entry of entries) {
            CompletionItemGenerator.registerKeyword(entry);
        }
    }
}

// PARSE TYPES
CompletionItemGenerator.registerKeywords(types);

// TODO : same for functions, etc

/** Completion items for 'onCompletion' */
export function getCompletionItems(): CompletionItem[] {
    return Array.from(CompletionItemGenerator.keyword_data).map(
        ([name, keyword_data]) => {
            return {
                label: keyword_data.label,
                kind: keyword_data.kind,
                data: keyword_data.data,
            };
        }
    );
}

/** Update item for 'onCompletionResolve' */
export function resolveCompletion(item: CompletionItem): CompletionItem {
    const item_data = CompletionItemGenerator.getItemFromData(item.data);

    item.detail = item_data?.detail;
    item.documentation = item_data?.documentation;

    return item;
}

/** Get tooltip for type */
export function getTooltip(s: string): string | undefined {
    return CompletionItemGenerator.keyword_data.get(s)?.tooltip;
}
