"use client"
import React from "react";

import PropTypes from "prop-types";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

function HeroButton({ text, route }: { text: string; route: string }) {
    const { user } = useAuth();

    if (user) return null;

    return (
        <Link href={route}>
            <Button variant="outline" size="lg" className="px-8 font-medium">
                {text}
            </Button>
        </Link>
    );
}

HeroButton.propTypes = {
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
};

export default HeroButton;
