"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const mobtimer_api_1 = require("mobtimer-api");
const mobtimer_api_2 = require("mobtimer-api");
class Controller {
    static updateSummary() {
        let participantsString = Controller.createListOfParticipantsWithRoleEmojisPrepended();
        document.title = `${Controller.statusSymbolText()}${Controller.secondsRemainingStringWithoutLeadingZero} ${participantsString} - ${Controller.getAppTitle()}`;
    }
    static createListOfParticipantsWithRoleEmojisPrepended() {
        const participantsCount = Controller._participants.length;
        const rolesCount = Controller._roles.length;
        const minCount = Math.min(participantsCount, rolesCount);
        let participants = [];
        if (minCount > 0) {
            for (let i = 0; i < minCount; i++) {
                const rolePrefix = this.extractFirstEmoji(Controller._roles[i]);
                const participant = Controller._participants[i];
                const combo = `${rolePrefix}${participant}`;
                participants.push(combo);
            }
            if (participantsCount > rolesCount) {
                for (let i = rolesCount; i < participantsCount; i++) {
                    const participant = Controller._participants[i];
                    participants.push(participant);
                }
            }
        }
        return participants.join(",");
    }
    static extractFirstEmoji(str) {
        const emojiRegex = /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?))*/gu;
        const match = str.match(emojiRegex);
        return match ? match[0] : "";
    }
    static get secondsRemainingStringWithoutLeadingZero() {
        const secondsRemainingString = Controller.frontendMobTimer.secondsRemainingString;
        return secondsRemainingString.startsWith("0")
            ? secondsRemainingString.substring(1)
            : secondsRemainingString;
    }
    static statusSymbolText() {
        let symbol = "";
        switch (Controller.frontendMobTimer.status) {
            case mobtimer_api_1.Status.Running:
                symbol = "▶️";
                break;
            case mobtimer_api_1.Status.Ready:
            case mobtimer_api_1.Status.Paused:
                symbol = "🟥";
                break;
        }
        return symbol;
    }
    static getAppTitle() {
        return "Mob Timer";
    }
    static injectSetDurationMinutes(setDurationMinutesFunction) {
        this.setDurationMinutes = setDurationMinutesFunction;
    }
    static injectSetSecondsRemainingString(setSecondsRemainingStringFunction) {
        this.setSecondsRemainingString = (timeString) => {
            setSecondsRemainingStringFunction(timeString);
            Controller.updateSummary();
        };
    }
    static injectSetParticipants(setParticipantsFunction) {
        this.setParticipants = setParticipantsFunction;
        Controller.updateSummary();
    }
    static injectSetRoles(setRolesFunction) {
        this.setRoles = setRolesFunction;
        Controller.updateSummary();
    }
    static translateResponseData(response) {
        const mobState = response.mobState;
        const mobStatus = mobState.status;
        const durationMinutes = mobState.durationMinutes;
        const participants = mobState.participants;
        Controller._participants = participants;
        const roles = mobState.roles;
        Controller._roles = roles;
        const secondsRemaining = mobState.secondsRemaining;
        return {
            mobStatus,
            durationMinutes,
            participants,
            roles,
            secondsRemaining,
        };
    }
    static getActionButtonLabel(backendStatus) {
        switch (backendStatus) {
            case mobtimer_api_1.Status.Running: {
                return "⏸️ Pause";
            }
            case mobtimer_api_1.Status.Paused: {
                return "▶️ Resume";
            }
            case mobtimer_api_1.Status.Ready: {
                return "▶️ Start";
            }
            default: {
                return "";
            }
        }
    }
    static toggle(client, frontendMobtimer) {
        switch (frontendMobtimer.status) {
            case mobtimer_api_1.Status.Running: {
                client.pause();
                break;
            }
            case mobtimer_api_1.Status.Paused: {
                client.start();
                break;
            }
            case mobtimer_api_1.Status.Ready: {
                client.start();
                break;
            }
        }
    }
    static changeStatus(frontendMobtimer, backendStatus) {
        if (frontendMobtimer.status !== backendStatus) {
            switch (backendStatus) {
                case mobtimer_api_1.Status.Running: {
                    frontendMobtimer.start();
                    break;
                }
                case mobtimer_api_1.Status.Paused: {
                    frontendMobtimer.pause();
                    break;
                }
                case mobtimer_api_1.Status.Ready: {
                    frontendMobtimer.reset();
                    break;
                }
            }
        }
    }
}
exports.Controller = Controller;
Controller.frontendMobTimer = new mobtimer_api_2.MobTimer("temp-not-to-be-used");
Controller.setDurationMinutes = (_durationMinutes) => { };
Controller.setSecondsRemainingString = (_timeString) => { };
Controller.setParticipants = (_participants) => { };
Controller.setRoles = (_roles) => { };
Controller._participants = [];
Controller._roles = [];
//# sourceMappingURL=controller.js.map