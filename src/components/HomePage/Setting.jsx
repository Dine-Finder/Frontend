import React, { useEffect, useState } from 'react';

const Setting = ({ title, content, optional, children, priorityUpdate }) => {
    const [priority, setPriority] = useState("Preference");  // Initialize as "Required"

    useEffect(() => {
        priorityUpdate(priority);
    }, [priority]);

    return (
        <div className="
            w-full
            border-0
            rounded-md
            "
        >
            <h2>{title}</h2>
            {optional === false
                ? <div className="w-full">
                    {children}
                  </div>
                : <div className="flex justify-between items-center">
                    <div>{children}</div>
                    <div className="flex flex-col">
                        <button className={`
                            px-2 py-2 m-1 text-sm rounded-md hover:scale-105 active:scale-100
                            ${priority === "Required" ? 'text-white bg-gradient-to-r from-orange-400 to-orange-800' : 'text-white-500 hover:text-orange-600 border'}
                            `}
                            onClick={() => setPriority("Required")}
                        >
                            Required
                        </button>
                        <button className={`
                            px-2 py-2 m-1 text-sm rounded-md hover:scale-105 active:scale-100
                            ${priority === "Preference" ? 'text-white bg-gradient-to-r from-orange-400 to-orange-800' : 'text-white-500 hover:text-orange-600 border'}
                            `}
                            onClick={() => setPriority("Preference")}
                        >
                            Preference
                        </button>
                    </div>
                  </div>
            }
        </div>
    );
}

export default Setting;
