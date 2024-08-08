import React from "react";
import FindPasswordForm from "../auth/FindPasswordForm";
import AuthCompleteBox from "../auth/AuthCompleteBox";

const FindPasswordTemplate: React.FC = () => {
    const [completed, setCompleted] = React.useState<boolean>(false);

    return (
        <div>
            {!completed && <FindPasswordForm setCompleted={setCompleted}/>}
            {completed &&
                <div className="flex flex-col min-h-screen min-w-[37vw] justify-center items-center">
                    <div className="mb-4 font-noto-sans-kr font-bold text-5xl text-mint">Complete ✔</div>
                    <div className="font-noto-sans-kr font-light text-xl text-charcoal">
                        Please check your email.
                    </div>
                </div>
            }

        </div>


    );
}

export default FindPasswordTemplate;