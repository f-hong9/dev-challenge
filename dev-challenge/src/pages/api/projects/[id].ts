/*
 *  This endpoint is used to create special URLs for specific projects by using Dynamic routing
 *  
 * 
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import dbquery from '@/lib/db';

type Project = {
  project_id: string,
  project_name: string,
  project_description: string,
  project_founder: string,
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Project[]>
) {
    const { id } = req.query;

	const result = await dbquery(`SELECT project_id, project_name, project_description, project_founder FROM projects WHERE project_id = '${id}'`) 
		.then((res) => res.rows)
		.catch((err) => console.error("Error executing query", err.stack));

	res.status(200).json(result);
}