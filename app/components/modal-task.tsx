import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ObjectTask } from "@/types/request";
import { CommentsForm } from "./form-comments";

export default function ModalTask({ data }: { data: ObjectTask }) {
  const comentarios = [
    "Ótimo trabalho! O código está bem organizado e fácil de entender.",
    "Seria interessante adicionar uma animação sutil ao abrir o modal.",
    "Poderíamos considerar otimizar a renderização dos cards para melhorar o desempenho.",
    "A função `renderPriorityBalls` está muito bem implementada!",
    "Você poderia explorar uma paleta de cores mais vibrante para os botões.",
    "Talvez seja útil adicionar um filtro de busca para as tarefas.",
    "O uso de estados e ganchos personalizados está excelente aqui.",
    "Seria útil adicionar tooltips explicativos em alguns elementos.",
    "Precisamos garantir que o design responsivo esteja totalmente implementado.",
    "A integração com o `Dialog` ficou muito elegante!",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full h-fit py-1">
          Visualizar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <main className="">
          <DialogHeader>
            {data.title}
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
              inventore quas enim soluta molestiae eius incidunt culpa amet
              ducimus. Dolorum quia consequuntur tempora consequatur adipisci
              officia quae similique mollitia eaque!
            </DialogDescription>
          </DialogHeader>

          <Accordion type="single" collapsible asChild>
            <AccordionItem value="item-1">
              <AccordionTrigger>Adicionar Comentário</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 px-1 mt-1">
                {/* <Textarea className="max-h-20"></Textarea>
                <div className="w-full flex justify-end">
                  <Button className="text-white">Salvar</Button>
                </div> */}
                <CommentsForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <section className="flex flex-col gap-2 max-h-72 overflow-auto">
            {comentarios.map((value, index) => (
              <div
                key={index}
                className="p-2 border rounded-lg bg-gray-300 dark:bg-gray-700"
              >
                {value}
              </div>
            ))}
          </section>
        </main>
      </DialogContent>
    </Dialog>
  );
}
