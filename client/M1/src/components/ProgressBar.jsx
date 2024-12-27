import React from 'react'
import "./progress.css"

const ProgressBar = ({ currentStep }) => {
    return (
        <section className="step-wizard">
            <ul className="step-wizard-list">
                <li className={currentStep == 0 ? `step-wizard-item current-item` : `step-wizard-item `}>
                    <span className="progress-count">1</span>
                    <span className="progress-label">Concent Collection</span>
                </li>

                <li className={currentStep == 1 ? `step-wizard-item current-item` : `step-wizard-item `}>
                    <span className="progress-count">2</span>
                    <span className="progress-label">Aadhaar Authentication</span>
                </li>

                <li className={currentStep == 2 ? `step-wizard-item current-item` : `step-wizard-item `}>
                    <span className="progress-count">3</span>
                    <span className="progress-label">ABHA Address Creation</span>
                </li>
            </ul>
        </section>
    )
}

export default ProgressBar
