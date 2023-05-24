/** 错误码 */
export enum EnumErrorCode {
    /** 成功 */
    OK = 0,
    /** 失败 */
    FAIL = 1,
}
/** 用返回数据，默认接口定义 */
export interface ICommRet<T = unknown> {
    /** 错误码 */
    err: number;
    /** 错误信息 */
    msg: string;
    /** 数据 */
    data: T | undefined;
}
/** 能用返回类 */
export class XCommRet<T = unknown> implements ICommRet<T> {
    /** 错误码 */
    m_err: number;
    /** 错误信息 */
    m_msg: string;
    m_data: T | undefined;
    /**
     * 构造函数
     * @param paramErr 错误码
     * @param paramMsg 错误信息
     * @param paramData 携带的数据
     */
    public constructor(paramErr = EnumErrorCode.OK, paramMsg = '', paramData?: T) {
        this.m_err = paramErr;
        this.m_data = paramData;
        this.m_msg = paramMsg;
    }
    /**
     * 重置
     * @param paramErr 错误码
     * @param paramMsg 错误信息
     * @param paramData 携带的数据
     * @return 返回当前对象
     */
    public reset(paramErr = EnumErrorCode.OK, paramMsg = '', paramData?: T) {
        this.m_err = paramErr;
        this.m_data = paramData;
        this.m_msg = paramMsg;
        return this;
    }

    /**
     * 设置错误信息
     * @param paramMsg 设备错误信息
     * @param paramMsgPre=null 错误信息前缀
     */
    public setMsg(paramMsg = '', paramMsgPre?: string): void {
        if (paramMsgPre) {
            this.m_msg = `${paramMsgPre}${paramMsg}`;
        } else {
            this.m_msg = paramMsg;
        }
    }
    /** 错误码 */
    public get err() {
        return this.m_err;
    }
    public set err(paramErr: number) {
        this.m_err = paramErr;
    }
    /** 错误信息 */
    public get msg() {
        return this.m_msg;
    }
    public set msg(paramMsg: string) {
        this.m_msg = paramMsg;
    }
    /** 携带的数据 */
    public get data() {
        return this.m_data;
    }
    public set data(paramData: T | undefined) {
        this.m_data = paramData;
    }
    public toJSON(): ICommRet<T> {
        return {
            err: this.m_err,
            msg: this.m_msg,
            data: this.m_data,
        };
    }
    /**
     * 取错信息（含错误码）
     * - 例如:[100] 这是一个错误信息
     * @return 返回含有错误码的错误信息
     */
    public getErrorInfo(): string {
        if (this.isNotOK) {
            return `[${this.m_err}] ${this.m_msg}`;
        } else {
            return '';
        }
    }
    /** 判断返回值是不是成功 */
    public get isOK(): boolean {
        return this.m_err === EnumErrorCode.OK;
    }
    /** 判断返回值是不是失败 */
    public get isNotOK(): boolean {
        return this.m_err !== EnumErrorCode.OK;
    }

    /**
     * 从某返回对象赋值
     * @param paramRet 指定的返回值或结构
     */
    public assignFrom(paramRet: ICommRet<T>) {
        this.m_data = paramRet.data;
        this.m_err = paramRet.err;
        this.m_msg = paramRet.msg;
    }

    /**
     * 设为OK
     * - 会将错误码设为0，并设置携带的数据
     * @param paramdata 携带的数据
     * @param paramIsKeepMsg 是否保留已经设置的错误信息
     * @return 返回this
     */
    public setOK(paramdata?: T, paramIsKeepMsg = false): XCommRet<T> {
        this.m_err = EnumErrorCode.OK;
        this.m_data = paramdata;
        if (!(paramIsKeepMsg === true)) {
            this.m_msg = '';
        }
        return this;
    }
    /**
     * 设置错误信息
     * @param paramErr 错误码 @see error_common定义
     * @param paramMsg 错误信息
     * @param paramMsgPre 错误信息前缀 相当于执于了一次addErrorPre
     * @param paramData 携带的数据
     * @return 返回当前this
     */
    public setError(paramErr: number, paramMsg = '', paramMsgPre?: string, paramData?: T): XCommRet<T> {
        this.m_err = paramErr;
        if (paramMsgPre) {
            this.m_msg = `${paramMsgPre}${paramMsg}`;
        } else {
            this.m_msg = paramMsg;
        }
        this.m_data = paramData;
        return this;
    }
    /**
     * 增加错误信息前缀
     * @param paramMsgPre 前缀
     * @return 返回this
     */
    public addErrorPre(paramMsgPre: string): XCommRet<T> {
        this.m_msg = `${paramMsgPre}${this.m_msg}`;
        return this;
    }
}
