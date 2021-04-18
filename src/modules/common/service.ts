import * as cv from 'class-validator';
import { Response } from 'express';

export function successResponse(message: string, data: any, res: Response) {
    res.status(200).json({
        status: "success",
        message,
        data
    });
}

export function errorResponse(message: string, err: any, res: Response) {
    res.status(502).json({
        status: "error",
        message,
        errors: err
    });
}

export async function validate(model, res: Response) {
    const errors = await cv.validate(model)
    if (errors.length > 0) {
        errorResponse("Validation error", errors, res);
        return false
    }
    return true
}
