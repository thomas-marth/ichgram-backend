import { Document, CallbackError, Query } from "mongoose";
type MongooseErrorWithStatus = CallbackError & {
    status?: number;
};
type MongooseNext = (err?: CallbackError) => void;
export declare const handleSaveError: (error: MongooseErrorWithStatus, doc: Document, next: MongooseNext) => void;
export declare const setUpdateSettings: (this: Query<unknown, Document>) => void;
export {};
//# sourceMappingURL=hooks.d.ts.map