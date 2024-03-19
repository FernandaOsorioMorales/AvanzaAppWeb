export function Message(props: {msg_type: string, content: string}){
    return (
        <div className={props.msg_type}>
            <p>
                {props.content}
            </p>
        </div>
    )
}