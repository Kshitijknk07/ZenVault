import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getAuth } from '@clerk/express';

export const authMiddleware = ClerkExpressRequireAuth();

export const getUser = (req: Request) => {
  const { userId } = getAuth(req);
  if (!userId) throw new Error('Unauthorized');
  return userId;
};
[{
	"resource": "/home/common_user/Documents/ZenVault/zenvault-backend/src/routes/fileRoutes.ts",
	"owner": "typescript",
	"code": "2769",
	"severity": 8,
	"message": "No overload matches this call.\n  The last overload gave the following error.\n    Argument of type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to parameter of type 'RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.\n      Type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.\n        Type 'Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'void | Promise<void>'.\n          Type 'Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'Promise<void>'.\n            Type 'Response<any, Record<string, any>> | undefined' is not assignable to type 'void'.\n              Type 'Response<any, Record<string, any>>' is not assignable to type 'void'.",
	"source": "ts",
	"startLineNumber": 14,
	"startColumn": 37,
	"endLineNumber": 14,
	"endColumn": 59,
	"relatedInformation": [
		{
			"startLineNumber": 157,
			"startColumn": 5,
			"endLineNumber": 167,
			"endColumn": 10,
			"message": "The last overload is declared here.",
			"resource": "/home/common_user/Documents/ZenVault/zenvault-backend/node_modules/.pnpm/@types+express-serve-static-core@5.0.6/node_modules/@types/express-serve-static-core/index.d.ts"
		}
	]
},{
	"resource": "/home/common_user/Documents/ZenVault/zenvault-backend/src/routes/fileRoutes.ts",
	"owner": "typescript",
	"code": "2769",
	"severity": 8,
	"message": "No overload matches this call.\n  The last overload gave the following error.\n    Argument of type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to parameter of type 'RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.\n      Type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.\n        Type 'Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'void | Promise<void>'.\n          Type 'Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'Promise<void>'.\n            Type 'Response<any, Record<string, any>> | undefined' is not assignable to type 'void'.\n              Type 'Response<any, Record<string, any>>' is not assignable to type 'void'.",
	"source": "ts",
	"startLineNumber": 15,
	"startColumn": 40,
	"endLineNumber": 15,
	"endColumn": 60,
	"relatedInformation": [
		{
			"startLineNumber": 157,
			"startColumn": 5,
			"endLineNumber": 167,
			"endColumn": 10,
			"message": "The last overload is declared here.",
			"resource": "/home/common_user/Documents/ZenVault/zenvault-backend/node_modules/.pnpm/@types+express-serve-static-core@5.0.6/node_modules/@types/express-serve-static-core/index.d.ts"
		}
	]
},{
	"resource": "/home/common_user/Documents/ZenVault/zenvault-backend/src/routes/fileRoutes.ts",
	"owner": "typescript",
	"code": "2769",
	"severity": 8,
	"message": "No overload matches this call.\n  The last overload gave the following error.\n    Argument of type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to parameter of type 'RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.\n      Type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.\n        Type 'Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'void | Promise<void>'.\n          Type 'Promise<Response<any, Record<string, any>> | undefined>' is not assignable to type 'Promise<void>'.\n            Type 'Response<any, Record<string, any>> | undefined' is not assignable to type 'void'.\n              Type 'Response<any, Record<string, any>>' is not assignable to type 'void'.",
	"source": "ts",
	"startLineNumber": 16,
	"startColumn": 30,
	"endLineNumber": 16,
	"endColumn": 49,
	"relatedInformation": [
		{
			"startLineNumber": 157,
			"startColumn": 5,
			"endLineNumber": 167,
			"endColumn": 10,
			"message": "The last overload is declared here.",
			"resource": "/home/common_user/Documents/ZenVault/zenvault-backend/node_modules/.pnpm/@types+express-serve-static-core@5.0.6/node_modules/@types/express-serve-static-core/index.d.ts"
		}
	]
}]