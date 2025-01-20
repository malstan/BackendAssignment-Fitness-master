// Definition of the user object in the request object
declare namespace Express {
    interface Request {
        user?: {
            id: number;
            role: string;
        };
    }
}
