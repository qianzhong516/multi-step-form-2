import type { Meta, StoryObj } from '@storybook/react';
import { SelectPlanForm as Component } from '../select_plan_form';
import React from 'react';
import { PlanDetails } from '../../../../types';

const meta = {
    title: 'Multi-step Form/SelectPlan',
    component: Component,
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectPlanForm: Story = {
    render: (args) => {
        const [planDetails, setPlanDetails] = React.useState<PlanDetails>({
            type: 'monthly',
            planType: 'arcade',
            price: 9,
        });
        const onChange = (value: PlanDetails) => {
            setPlanDetails(value);
        };

        return (
            <Component
                {...args}
                planDetails={planDetails}
                onChange={onChange}
            />
        );
    },
    args: {},
};