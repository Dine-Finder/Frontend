//src Setting.jsx
import React, { useEffect, useState } from 'react';

const Setting = ({title, content, optional, children, priorityUpdate}) => {
    const [priority, setPriority] = useState("Preference")

    useEffect(()=>{
        priorityUpdate(priority)
    }, [priority]);

    return (
        <div className="
        w-[100%]  
        border-0
        rounded
        font-bold 
        z-10
        "    
        > 
            <h2>{title}</h2>
            { (optional===false)
                ?<div className="
                    w-[100%]
                    "
                    >
                        {children}
                    </div>
                :<div className="flex">
                <div className="h-10">{children}</div>
                <div 
                    className="
                    w-[80px]
                    right-0
                    "
                    >
                        { (priority==="Indifferent")
                        ?<> 
                            <button className="
                                w-[80px] 
                                bg-red
                                font-normal 
                                text-white
                                border-[2px] 
                                border-black 
                                rounded
                                ">
                                Indifferent
                            </button>
                            <button className="
                                w-[80px] 
                                bg-grey 
                                hover:bg-yellowlight
                                font-normal 
                                border-[2px] 
                                border-black 
                                rounded
                                "
                                onClick={() => setPriority("Preference")}
                                >
                                Preference
                            </button>
                            <button className="
                                w-[80px] 
                                bg-grey 
                                hover:bg-greenlight
                                font-normal 
                                border-[2px] 
                                border-black 
                                rounded
                                "
                                onClick={() => setPriority("Required")}
                                >
                                Required
                            </button>
                        </>
                        :<>
                            {(priority==="Preference")
                            ?<> 
                                <button className="
                                    w-[80px] 
                                    bg-grey 
                                    hover:bg-redlight
                                    font-normal 
                                    border-[2px] 
                                    border-black 
                                    rounded
                                    "
                                    onClick={() => setPriority("Indifferent")}
                                    >
                                    Indifferent
                                </button>
                                <button className="
                                    w-[80px] 
                                    bg-orange
                                    font-normal 
                                    text-white
                                    border-[2px] 
                                    border-black 
                                    rounded
                                    "
                                    >
                                    Preference
                                </button>
                                <button className="
                                    w-[80px] 
                                    bg-grey 
                                    hover:bg-greenlight
                                    font-normal 
                                    border-[2px] 
                                    border-black 
                                    rounded
                                    "
                                    onClick={() => setPriority("Required")}
                                    >
                                    Required
                                </button>
                            </>
                        :<>
                            <button className="
                                w-[80px] 
                                bg-grey 
                                hover:bg-redlight
                                font-normal 
                                border-[2px] 
                                border-black 
                                rounded
                                "
                                onClick={() => setPriority("Indifferent")}
                                >
                                Indifferent
                            </button>
                            <button className="
                                w-[80px] 
                                bg-grey 
                                hover:bg-yellowlight
                                font-normal 
                                border-[2px] 
                                border-black 
                                rounded
                                "
                                onClick={() => setPriority("Preference")}
                                >
                                Preference
                            </button>
                            <button className="
                                w-[80px] 
                                bg-green
                                font-normal 
                                text-white
                                border-[2px] 
                                border-black 
                                rounded
                                ">
                                Required
                            </button>
                        </>
                        }
                        </>
                        }   

                </div>
                </div>
            }
            
        </div>
    )
}

export default Setting