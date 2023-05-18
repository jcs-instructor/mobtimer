import { Status } from "mobtimer-api";
import { MobTimerResponses } from "mobtimer-api";
import { MobSocketClient } from "mobtimer-api";
import { MobTimer } from "mobtimer-api";
export declare class Controller {
    static updateSummary(): void;
    private static createListOfParticipantsWithRoleEmojisPrepended;
    static extractFirstEmoji(str: string): string;
    static get secondsRemainingStringWithoutLeadingZero(): any;
    static statusSymbolText(): string;
    static frontendMobTimer: MobTimer;
    static client: MobSocketClient;
    static getAppTitle(): string;
    static setDurationMinutes: (_durationMinutes: number) => void;
    static injectSetDurationMinutes(setDurationMinutesFunction: (durationMinutes: number) => void): void;
    static setSecondsRemainingString: (_timeString: string) => void;
    static injectSetSecondsRemainingString(setSecondsRemainingStringFunction: (timeString: string) => void): void;
    static setParticipants: (_participants: string[]) => void;
    static injectSetParticipants(setParticipantsFunction: (participants: string[]) => void): void;
    static setRoles: (_roles: string[]) => void;
    static injectSetRoles(setRolesFunction: (roles: string[]) => void): void;
    static translateResponseData(response: MobTimerResponses.SuccessfulResponse): {
        mobStatus: any;
        durationMinutes: any;
        participants: any;
        roles: any;
        secondsRemaining: any;
    };
    static _participants: string[];
    static _roles: string[];
    static getActionButtonLabel(backendStatus: Status): "⏸️ Pause" | "▶️ Resume" | "▶️ Start" | "";
    static toggle(client: MobSocketClient, frontendMobtimer: MobTimer): void;
    static changeStatus(frontendMobtimer: MobTimer, backendStatus: Status): void;
}
