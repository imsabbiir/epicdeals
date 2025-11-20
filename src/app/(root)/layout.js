import Footer from "@/components/(root)/Footer"
import Header from "@/components/(root)/Header"

function layout({children}) {
  return (
    <div className="w-full overflow-hidden">
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default layout