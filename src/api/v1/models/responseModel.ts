/**
* Interface representing a standard API response
* @template T - The type of the data property
*/
interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: { message: string; code?: string };
    timestamp?: string;
}
 
/**
* Creates a success response object
* @param data - The data to include in a response
* @param message - Optional message providing additional context
* @returns A standardized success response
*/
export const successResponse = <T>(
    data: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});
 
/**
* Creates a standardized error response object
* Ensures all API errors follow the same format
* @param message - The error message
* @param code - Optional error code for easier debugging
* @returns A standardized error response
*/
export const errorResponse = (
    message: string,
    code?: string
): ApiResponse<null> => ({
    status: "error",
    error: { message, code },
    timestamp: new Date().toISOString(),
});
 