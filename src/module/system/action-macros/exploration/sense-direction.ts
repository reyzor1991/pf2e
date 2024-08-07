import { ActionMacroHelpers, SkillActionOptions } from "../index.ts";
import { ModifierPF2e } from "@actor/modifiers.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";

function senseDirection(options: SkillActionOptions): void {
    const modifiers = [
        new ModifierPF2e({
            label: "PF2E.Actions.SenseDirection.Modifier.NoCompass",
            modifier: -2,
            predicate: [{ not: "compass-in-possession" }],
            type: "item",
        }),
    ].concat(options?.modifiers ?? []);
    const slug = options?.skill ?? "survival";
    const rollOptions = ["action:sense-direction"];
    ActionMacroHelpers.simpleRollActionCheck({
        actors: options.actors,
        actionGlyph: options.glyph,
        title: "PF2E.Actions.SenseDirection.Title",
        checkContext: (opts) => ActionMacroHelpers.defaultCheckContext(opts, { modifiers, rollOptions, slug }),
        traits: ["exploration", "secret"],
        event: options.event,
        callback: options.callback,
        difficultyClass: options.difficultyClass,
        extraNotes: (selector: string) => [
            ActionMacroHelpers.note(selector, "PF2E.Actions.SenseDirection", "criticalSuccess"),
            ActionMacroHelpers.note(selector, "PF2E.Actions.SenseDirection", "success"),
        ],
    }).catch((error: Error) => {
        ui.notifications.error(error.message);
        throw error;
    });
}

const action = new SingleCheckAction({
    description: "PF2E.Actions.SenseDirection.Description",
    img: "icons/skills/movement/arrow-upward-yellow.webp",
    modifiers: [
        {
            label: "PF2E.Actions.SenseDirection.Modifier.NoCompass",
            modifier: -2,
            predicate: [{ not: "compass-in-possession" }],
            type: "item",
        },
    ],
    name: "PF2E.Actions.SenseDirection.Title",
    notes: [
        { outcome: ["criticalSuccess"], text: "PF2E.Actions.SenseDirection.Notes.criticalSuccess" },
        { outcome: ["success"], text: "PF2E.Actions.SenseDirection.Notes.success" },
    ],
    rollOptions: ["action:sense-direction"],
    sampleTasks: {
        untrained: "PF2E.Actions.SenseDirection.SampleTasks.Untrained",
        trained: "PF2E.Actions.SenseDirection.SampleTasks.Trained",
        expert: "PF2E.Actions.SenseDirection.SampleTasks.Expert",
        master: "PF2E.Actions.SenseDirection.SampleTasks.Master",
        legendary: "PF2E.Actions.SenseDirection.SampleTasks.Legendary",
    },
    slug: "sense-direction",
    statistic: "survival",
    traits: ["exploration", "secret"],
});

export { senseDirection as legacy, action };
