import { Link as ReactLink, LinkProps as ReactLinkProps } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

export function DomLink(props: ReactLinkProps & NextLinkProps ) {
  return (
    <ReactLink component={NextLink} {...props}>{props.children}</ReactLink>
  )
}