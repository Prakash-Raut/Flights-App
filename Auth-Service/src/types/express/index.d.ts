declare;
{
	namespace Express {
		export interface Request {
			user?: {
				id: string;
				email: string;
				password: string;
				refreshToken: string | null;
				createdAt: Date;
				updatedAt: Date;
			};
		}
	}
}
