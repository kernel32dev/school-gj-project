/// <reference path="../../types.d.ts" />
import "./global";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2/options";
import { handlers } from "./handlers";
import { development } from "./environment";

setGlobalOptions({
    region: "southamerica-east1"
});

export const backend = onCall({}, (req: CallableRequest<any>): any => {
    const handler = handlers[req.data.api as keyof FirebaseApi];
    if (typeof handler !== "function") {
        throw new Error(`name \"${req.data.api}\" is not a valid name`);
    }
    const promise = handler(req as any);
    if (development) return promise.catch(e => { error: e });
    return promise;
});
