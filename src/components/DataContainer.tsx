import React, { useState } from 'react';
import { ComponentProps, DataList, ReposData } from '../interface/Users.type';

const DataContainer: React.FC<ComponentProps> = ({ keyword, dataList }) => {
    const [repos, setRepos] = useState<ReposData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRepos = async (user: DataList): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(user.repos_url);
            const data = await response.json();
            data.map((val: {
                id: number;
                name: string;
                stargazers_count: number;
                description: string;
            }) => {
                const dummy = {
                    login: user.login,
                    name: val.name,
                    stargazers: val.stargazers_count,
                    description: val.description,
                    id: val.id
                }
                setRepos(prevRepo => [...prevRepo, dummy]);
            })

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    const handleClick = (data: DataList) => {
        const exist = repos.find(repo => repo.login === data.login);
        if (exist === undefined) {
            fetchRepos(data);
        }
    }

    return (
        <>
            <div>
                <label className="text-sm text-gray-600 dark:text-white">Showing users for "{keyword}"</label>
            </div>

            <div className="flex items-center">
                <div className="flex flex-col w-full">
                    {dataList.map((data) => (
                        <button className="group focus:outline-none mb-2" key={data.login} id={data.login} onClick={() => handleClick(data)}>
                            <div className="group-label flex items-center justify-between h-12 px-3 font-semibold bg-gray-300 rounded">
                                <span className="truncate">{data.login}</span>
                                <svg className="h-4 w-4 icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div className="group-content max-h-0 overflow-hidden duration-300 ml-4 mt-2 scrollbar scrollbar-thin">
                                {repos.map(repo => {
                                    if (repo.login === data.login) {
                                        if (loading === false) {
                                            return (
                                                <div className="bg-gray-400 p-3 rounded mb-2" key={repo.id}>
                                                    <p className="flex justify-between font-bold text-sm">
                                                        <label>{repo.name}</label>
                                                        <label className="flex items-center">
                                                            {repo.stargazers}
                                                            <svg aria-hidden="true" className="w-3 h-3 ml-1 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                            </svg>
                                                        </label>
                                                    </p>
                                                    <p className="text-left text-sm max-h-80">
                                                        {repo.description}
                                                    </p>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div role="status" className="animate-pulse mt-3" key={repo.id}>
                                                    <div className="h-12 bg-gray-200 rounded dark:bg-gray-700 w-full mb-2"></div>
                                                </div>
                                            )
                                        }
                                    }
                                })}
                            </div>

                        </button>
                    ))}

                </div>
            </div>
        </>
    )
}

export default DataContainer;