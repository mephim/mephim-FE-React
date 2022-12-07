interface IProp {
    element: any;
}

function BaseRouter({ element }: IProp) {
    return <>{element}</>
}

export default BaseRouter;
