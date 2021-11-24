import React, {ChangeEvent, KeyboardEvent} from "react";

type propsType = {
    value: string
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyPressHandler: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props: propsType) => {

    return (
        <input onChange={props.onChangeHandler} onKeyPress={props.onKeyPressHandler} value={props.value} />
    )
}