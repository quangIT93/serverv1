export class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
    }
    
    public static handle(error: any): string {
        switch (error.code) {
            case "ER_DUP_ENTRY":
                return "Duplicate entry";
            case "ER_NO_REFERENCED_ROW_2":
                return "Foreign key constraint fails";
            case "PROTOCOL_CONNECTION_LOST":
                return "Connection lost";
                
            default:
                return "Unknown error";
        }
    }

    public static handleWithCode(error: any): string {
        switch (error.code) {
            case "ER_DUP_ENTRY":
                return error.code;
            case "ER_NO_REFERENCED_ROW_2":
                return error.code;
            default:
                return "Unknown error";
        }
    }
}