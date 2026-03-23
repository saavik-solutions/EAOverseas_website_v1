import React, { useState } from 'react';
import { generateAIBlog, createBlog } from '@/services/blogService';

interface AIBlogGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORIES = ['Admission', 'Universities', 'Facts', 'FOMO'];

const AIBlogGeneratorModal: React.FC<AIBlogGeneratorModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [mode, setMode] = useState<'experiment' | 'custom'>('experiment');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const blog = await generateAIBlog({ category, mode, keywords });
      setGeneratedBlog(blog);
    } catch (error) {
      console.error('Generation failed', error);
      alert('AI Generation failed. Please check your API key and network.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (publish: boolean) => {
    if (!generatedBlog) return;
    setIsSaving(true);
    try {
      const success = await createBlog({
        ...generatedBlog,
        isPublished: publish,
        slug: generatedBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        author: 'Saavik AI Expert',
        readTime: '5 min read'
      });
      if (success) {
        onSuccess();
        onClose();
      } else {
        alert('Failed to save blog to database.');
      }
    } catch (error) {
      console.error('Save failed', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-white/20">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <span className="material-symbols-outlined text-[28px]">auto_awesome</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-none">AI Blog Generator</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Generate premium institutional content in seconds</p>
            </div>
          </div>
          <button onClick={onClose} className="size-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {!generatedBlog ? (
            <div className="space-y-8 max-w-2xl mx-auto py-10">
              {/* Category Selection */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Content Category</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${category === cat ? 'bg-indigo-50 border-indigo-600 text-indigo-600' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selection */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Generation Mode</label>
                <div className="flex gap-4 p-1.5 bg-slate-100 rounded-[1.25rem]">
                  <button
                    onClick={() => setMode('experiment')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${mode === 'experiment' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">biotech</span>
                    AI Experiment
                  </button>
                  <button
                    onClick={() => setMode('custom')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${mode === 'custom' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    Custom Keywords
                  </button>
                </div>
              </div>

              {/* Keywords Input */}
              {mode === 'custom' && (
                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Keywords / Ideas</label>
                  <textarea
                    placeholder="e.g. why study in USA in 2026, admission tips for Harvard, post-study work permits..."
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                    className="w-full h-32 p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-medium focus:outline-none focus:border-indigo-600 transition-all resize-none"
                  />
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating || (mode === 'custom' && !keywords.trim())}
                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-10"
              >
                {isGenerating ? (
                  <><span className="animate-spin material-symbols-outlined">sync</span> Consultating with AI Brain...</>
                ) : (
                  <><span className="material-symbols-outlined">bolt</span> Generate Blog Content</>
                )}
              </button>
            </div>
          ) : (
            /* Preview Container */
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">AI PREVIEW</span>
                <button onClick={() => setGeneratedBlog(null)} className="text-indigo-600 text-xs font-black flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span> Regenerate
                </button>
              </div>

              <div className="rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden shadow-sm">
                <div className="h-64 relative">
                  <img src={generatedBlog.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h1 className="text-3xl font-black text-white leading-tight">{generatedBlog.title}</h1>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {generatedBlog.tags?.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-black bg-white border border-slate-200 text-slate-500 px-3 py-1.5 rounded-xl uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="p-6 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm">
                    <p className="text-slate-500 italic font-medium leading-relaxed">"{generatedBlog.excerpt}"</p>
                  </div>

                  <div className="prose prose-slate max-w-none text-slate-700 font-medium leading-[1.8]">
                    {generatedBlog.content.split('\n').map((para: string, i: number) => (
                      <p key={i} className="mb-4">{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {generatedBlog && (
          <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { setGeneratedBlog(null); onClose(); }}
              className="flex-1 py-4 bg-white border-2 border-red-100 text-red-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span> Discard / Delete
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? 'Processing...' : <><span className="material-symbols-outlined text-[20px]">save</span> Save as Draft</>}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? 'Publishing...' : <><span className="material-symbols-outlined text-[20px]">send</span> Publish Immediately</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBlogGeneratorModal;
