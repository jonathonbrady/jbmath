import { useRecoilValue } from "recoil";
import { elementSet } from "../modals/NewElementModal";
import { currentScene, currentStep } from "../toolbar/SceneManager";

export interface AnimationObject {
    step: number;
    type: string;
    arg: number;
    duration: number;
}