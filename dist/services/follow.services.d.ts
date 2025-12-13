import { Types } from "mongoose";
export declare const getUserFollowers: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../db/models/Follow.js").FollowDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Follow.js").FollowDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const getUserFollowing: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../db/models/Follow.js").FollowDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Follow.js").FollowDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const followUser: (followerId: Types.ObjectId, followingId: string) => Promise<import("mongoose").Document<unknown, {}, import("../db/models/Follow.js").FollowDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Follow.js").FollowDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const unfollowUser: (followerId: Types.ObjectId, followingId: string) => Promise<import("mongoose").Document<unknown, {}, import("../db/models/Follow.js").FollowDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../db/models/Follow.js").FollowDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=follow.services.d.ts.map