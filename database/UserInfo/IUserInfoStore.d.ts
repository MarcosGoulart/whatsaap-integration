import {IUserInfo} from './IUserInfo'

export declare interface IUserInfoStore {
    updateOrInsert(userInfo: IUserInfo) : Promise<boolean>
    getByEmail(email: string) : Promise<IUserInfo>
}