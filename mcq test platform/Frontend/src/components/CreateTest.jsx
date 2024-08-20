import React from 'react'
import { Link } from 'react-router-dom';
import ViewInArSharpIcon from '@mui/icons-material/ViewInArSharp';
import '../css/CreateTest.css'

function CreateTest() {
    return (
        <>
            <div className="create-test">
                <div className="create-test-up">
                    <p className="sub-heading1 text">Create Test</p>
                    <p className="heading-create-test text">Create Coding Challenges</p>
                    <p className="sub-heading2">Enhance your coding skills with comprehesive testing platform</p>
                </div>
                <div className="create-test-down">
                    <div className="create-card">
                        <div className="cc-left">
                            <ViewInArSharpIcon fontSize="medium" />
                        </div>
                        <div className="cc-right">
                            <p className="ccr-head">
                                <Link to="">Create Coding Test</Link>
                            </p>
                            <p className="ccr-explain">
                                Design challenges with simple coding test
                            </p>
                        </div>
                    </div>

                    <div className="create-card">
                        <div className="cc-left">
                            <ViewInArSharpIcon fontSize="medium" />
                        </div>
                        <div className="cc-right">
                            <p className="ccr-head">
                                <Link to="">Create Custom Coding Test</Link>
                            </p>
                            <p className="ccr-explain">
                                Design your own coding test with custom problems
                            </p>
                        </div>
                    </div>

                    <div className="create-card">
                        <div className="cc-left">
                            <ViewInArSharpIcon fontSize="medium" />
                        </div>
                        <div className="cc-right">
                            <p className="ccr-head">
                                <Link to="">Create Coding MCQ</Link>
                            </p>
                            <p className="ccr-explain">
                                Create challenges with coding MCQ
                            </p>
                        </div>
                    </div>

                    <div className="create-card">
                        <div className="cc-left">
                            <ViewInArSharpIcon fontSize="medium" />
                        </div>
                        <div className="cc-right">
                            <p className="ccr-head">
                                <Link to="">Create Fundamental MCQ</Link>
                            </p>
                            <p className="ccr-explain">
                               Create computer fundamental MCQ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTest
